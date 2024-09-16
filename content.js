exports.createMessage = (name, companyName, jobProfile, jobId) => {
    const greeting = name ? `Dear ${name},` : "Hello,";

    const message = `
    ${greeting}

I hope this message finds you well. I am Vikas Raria, an experienced MERN Stack Developer seeking new opportunities.

With over 3 years of experience in the tech industry, specializing in fullstack, frontend, and backend development, I believe I can bring significant value to your team. 

I am interested in the ${jobProfile || "relevant position"} at ${companyName || "your esteemed company"}. Attached is my resume for your review.

Google Drive Resume Link: https://drive.google.com/file/d/1DT5Ni-wgNi2QVq881mZIa6KVP8a3dWus/view

Best regards,
Vikas Raria
+91 8708373309
    `;

    return message;
};
