import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req, res) {
  const { message } = req.body

  if (!message) {
    console.log("요청 본문 없음:", req.body)
    return res.status(400).json({ message: "No message provided" })
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "너는 Framer 프로젝트 'CIRCULAR LABS'에 대해 공부한 챗봇이야. 이 프로젝트와 관련 없는 질문엔 '저는 Circular Labs 전용 챗봇이에요!'라고 답변해.",
        },
        { role: "user", content: message },
      ],
    })

    const reply = response?.choices?.[0]?.message?.content

    if (!reply) {
      return res.status(500).json({ message: "GPT 응답이 없습니다." })
    }

    res.status(200).json({ message: reply })
  } catch (err) {
    console.error("GPT 호출 에러:", err)
    res.status(500).json({ message: "답변 중 문제가 발생했어요." })
  }
}
