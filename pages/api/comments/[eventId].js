import fs from "fs";
import path from "path";

export function buildCommentsPath() {
  return path.join(process.cwd(), "data", "comments.json");
}

export function extractComments(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  const selectedEventId = req.query.eventId;
  if (req.method === "POST") {
    // const userEmail = req.body.email;
    // const newEmailRegistration = {
    //   id: new Date().toISOString(),
    //   email: userEmail,
    // };
    // const filePath = buildNewsletterPath();
    // const data = extractNewsletter(filePath);
    // data.push(newEmailRegistration);
    // fs.writeFileSync(filePath, JSON.stringify(data));
    // res.status(201).json({ message: "Success!", email: newEmailRegistration });
  } else if (req.method === "GET") {
    const filePath = buildCommentsPath();
    const data = extractComments(filePath);
    const comments = data.filter(
      (comment) => comment.eventId == selectedEventId
    );
    res.status(200).json({ comments: comments });
  } else {
    res.status(404);
  }
}

export default handler;
