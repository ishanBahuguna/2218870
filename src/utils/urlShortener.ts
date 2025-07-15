const charset =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SHORTCODE_LENGTH = 6;

export default function createShortUrl(
  originalURL: string,

  shortcodes: Set<string>
) {
  let protocol = "";
  if (originalURL.startsWith("https://")) {
    protocol = "https://";
    originalURL = originalURL.slice(8);
  } else if (originalURL.startsWith("http://")) {
    protocol = "http://";
    originalURL = originalURL.slice(7);
  }

  let shortCode = generateUniqueShortcode(shortcodes);

  const shortUrl = `${protocol}your-short-url/${shortCode}`;

  return {
    shortUrl,
    shortCode
  }
}

function generateUniqueShortcode(shortcodes: Set<string>): string {
  let shortcode = "";

  const generate = (): string => {
    let code = "";
    for (let i = 0; i < SHORTCODE_LENGTH; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      code += charset[randomIndex];
    }
    return code;
  };

  do {
    shortcode = generate();
  } while (shortcodes.has(shortcode));

  return shortcode;
}
