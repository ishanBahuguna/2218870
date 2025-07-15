
import { Request, Response } from "express";
import { log } from "../middlerwares/log";
import { UrllData } from "../types";
import  * as z from "zod"
import createShortUrl from "../utils/urlShortener";

const urls: Map<string, string> = new Map();
const shortcodes: Set<string> = new Set();

export const ValidateUrlData = z.object( {
    url:z.url(),
    validity:z.number().positive(),
    shortCode:z.string().optional()
})

export const createShortenedUrl = async (req:Request , res:Response) => {
    try {
        await log("backend" , "info" , "controller" , "create the shortened url")
        const body = req.body;

        const {success} = ValidateUrlData.safeParse(body);

        if(!success) {
            return res.status(500).json({
                success:false,
                message:"Invaild data"
            })
        }

        let shortUrl: string;
        let shortCode: string;

        do {
            ({ shortUrl, shortCode } = createShortUrl(body.url, shortcodes));
        } while (urls.has(shortUrl));

        urls.set(shortCode , body.url);

        const expiry = new Date(Date.now() + body.validity);


        return res.status(200).json({
            shortLink: shortUrl,
            expiry
        });


    } catch(e:any) {
        console.log(e)
    }
    
}




export const redirect = async (req: Request, res: Response) => {
  try {
    await log("backend" , "info" , "controller" , "redirect to orignal url")
    const shortcode = req.params.shortcode;
    
    if (!shortcode) {
      return res.status(400).json({
        error: 'Shortcode is required'
      });
    }
    

    const originalUrl = urls.get(shortcode);
    
  
    if (!originalUrl) {
      return res.status(404).json({
        error: 'URL not found',
        message: 'The shortened URL does not exist or has expired'
      });
    }
    res.redirect(200, originalUrl);
    
  } catch(e:any) {
  
    res.status(500).json({ error: "Internal server error" });
  }
}


