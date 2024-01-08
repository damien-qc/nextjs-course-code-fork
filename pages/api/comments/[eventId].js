import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

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
    const { email, name, text } = req.body;

    if (!email.includes("@") || !name || name.trim() === "") {
      res.status(422).json({ message: "Invalid Input." });
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      feedback,
      eventId: selectedEventId,
    };
    const filePath = buildCommentsPath();
    const data = extractComments(filePath);

    data.push(newComment);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success!", comment: newComment });
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
