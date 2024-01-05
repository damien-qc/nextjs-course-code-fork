import fs from "fs";
import path from "path";

export function buildNewsletterPath() {
  return path.join(process.cwd(), "data", "comments.json");
}

export function extractNewsletter(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    const newEmailRegistration = {
      id: new Date().toISOString(),
      email: userEmail,
    };

    const filePath = buildNewsletterPath();
    const data = extractNewsletter(filePath);
    data.push(newEmailRegistration);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res.status(201).json({ message: "Success!", email: newEmailRegistration });
  } else {
    res.status(404);
  }
}

export default handler;
