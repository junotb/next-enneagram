import Questions from '@/public/json/questions.json';

export default function Page() {
  return (
    <main className='flex justify-center items-center w-full'>
      <div className='w-[80rem] h-[48rem] overflow-y-scroll space-y-4'>
        {
          Questions.map((question) => (
            <div
              key={question.seq}
              className='border-2 border-white rounded-lg'
            >
              <div className='question hover:hidden p-4'>{question.question}</div>
              <div className='mark hidden p-4'>Hello</div>
            </div>
          ))
        }
      </div>
    </main>
  )
}
