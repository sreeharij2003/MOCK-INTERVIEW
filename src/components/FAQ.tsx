
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI interviewer work?",
      answer:
        "Our AI interviewer uses advanced natural language processing to conduct realistic interview conversations. It can ask relevant questions based on the job role, evaluate your responses, and provide feedback on your answers, communication skills, and body language through video analysis.",
    },
    {
      question: "What types of interviews can I practice?",
      answer:
        "You can practice technical interviews (coding, system design), behavioral interviews (using the STAR method), HR interviews, and industry-specific interviews customized for your target role and experience level.",
    },
    {
      question: "How accurate is the AI feedback?",
      answer:
        "Our AI feedback system has been trained on thousands of real interviews and calibrated by hiring managers and recruiters from top companies. It provides accurate, actionable insights that closely match what human interviewers look for.",
    },
    {
      question: "Can I use InterviewAce on my mobile device?",
      answer:
        "Yes, InterviewAce is fully responsive and works on desktop, tablet, and mobile devices. You can practice interviews anywhere with an internet connection and a camera.",
    },
    {
      question: "Do I need special equipment for the mock interviews?",
      answer:
        "You only need a device with a camera and microphone, such as a laptop, smartphone, or tablet, and a stable internet connection. No special equipment is required.",
    },
    {
      question: "How long does each mock interview session last?",
      answer:
        "Most mock interview sessions last between 30-45 minutes, including the interview practice and AI feedback. You can also choose shorter 15-minute sessions focused on specific questions.",
    },
  ];

  return (
    <section id="faq" className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Everything you need to know about InterviewAce
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-10 p-6 bg-blue-50 rounded-lg text-center">
            <h3 className="text-lg font-semibold mb-2">Still have questions?</h3>
            <p className="text-gray-600 mb-4">
              Our team is here to help with any other questions you might have.
            </p>
            <Button variant="outline">Contact Support</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
