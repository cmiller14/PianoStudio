import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

const about_messages = {
    message1: "Based in Bountiful, Utah, Lisa is a foundational figure in the studio, bringing over two decades of dedicated experience and a genuine passion for introducing the joy of piano to young learners. Her lifelong connection with the piano began in her own childhood, where she built a strong musical foundation through extensive lessons and study with talented professional instructors. This rich history and love for the instrument inspire her work teacahing musical talent to the next generation",
    message2: "At Lisa Miller Piano Studio, the primary focus is on fostering a positive and encouraging environment where young learners can develop a deep love for music and unlock their creativity. Private lessons, tailored to each student's pace and goals, are typically 30 to 45 minutes in length and are scheduled once or twice per week.",
    message3: "In addition to individual instruction, group classes are held periodically, often before recitals, to build ensemble skills and confidence. Students also have the option to participate in events such as the Federation piano competition for performance and evaluation opportunities."
};

const home_messages = {
    message1: ""
}

const header_messages = {
    title: "Lisa Miller Piano Studio",
    subHeader: "Welcome to your studio home base! ",
    about: "Check here for scheduling purposes, recital info, and links to resources you will use throughout the year."

}


app.get('/about/messages', (req, res) => {
    res.json(about_messages);
});

app.get("/header/messages", (req, res) => {
    resizeTo.json(header_messages);
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

