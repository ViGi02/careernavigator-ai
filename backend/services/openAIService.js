const OpenAI =
  require("openai");

const openai =
  new OpenAI({
    apiKey:
      process.env.OPENAI_API_KEY,
  });

const analyzeCVAI =
  async (
    cvText,
    skills
  ) => {

    const prompt = `
You are a career coach.

CV Skills:
${skills.join(", ")}

CV Text:
${cvText}

Return JSON:

{
  "summary":"",
  "strengths":[],
  "growthAreas":[],
  "careerPaths":[]
}
`;

    try {

        const response =
            await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                role: "user",
                content: prompt,
                },
            ],
            response_format: {
                type: "json_object",
            },
            });

        return JSON.parse(
            response.choices[0]
            .message.content
        );

    } catch (error) {

        console.error(
            "OpenAI Error:",
            error
        );

        return {
            summary:
                `Candidate has demonstrated experience with ${skills.slice(0, 5).join(", ")} and possesses a strong technical foundation.`,

            strengths: [
                "Technical Skills",
                "Problem Solving",
            ],

            growthAreas: [
                "Docker",
                "Cloud Technologies",
            ],

            careerPaths: [
                "Software Engineer",
                "Full Stack Developer",
            ],
        };

    }
};

module.exports =
  analyzeCVAI;