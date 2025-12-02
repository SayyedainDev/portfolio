import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadResume = async (req, res) => {
  try {
    const resumePath = path.join(__dirname, '..', 'resume.pdf');

    // Check if resume file exists
    if (!fs.existsSync(resumePath)) {
      return res.status(404).json({
        error: 'Resume file not found',
        message: 'Please add a resume.pdf file to the backend directory'
      });
    }

    // Set headers for download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="Sayyedain_Saqlain_Resume.pdf"');

    // Stream the file
    const fileStream = fs.createReadStream(resumePath);
    fileStream.pipe(res);

    console.log(`Resume downloaded - ${new Date().toISOString()}`);

  } catch (error) {
    console.error('Error downloading resume:', error);

    res.status(500).json({
      error: 'Failed to download resume',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
