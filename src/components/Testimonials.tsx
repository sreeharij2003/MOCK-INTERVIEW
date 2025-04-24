
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "InterviewAce helped me land my dream job at a top tech company. The AI feedback was spot-on and helped me identify weaknesses in my responses I wasn't even aware of.",
      author: "Sarah J.",
      role: "Software Engineer",
      company: "Tech Giant Inc."
    },
    {
      quote: "After using InterviewAce for just two weeks, I felt so much more confident walking into my interviews. The behavioral practice especially made a huge difference.",
      author: "Michael T.",
      role: "Product Manager",
      company: "Startup Innovators"
    },
    {
      quote: "As someone switching careers, I was nervous about technical interviews. The personalized practice sessions helped me focus on exactly what I needed to improve.",
      author: "Priya K.",
      role: "Data Scientist",
      company: "Analytics Co."
    }
  ];

  return (
    <section id="testimonials" className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-600">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Success Stories
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              See how InterviewAce has helped candidates land their dream jobs.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-current text-yellow-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-gray-600 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 bg-blue-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Our Success Metrics</h3>
            <p className="text-gray-600">Real results from our platform</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">87%</p>
              <p className="text-gray-600">Interview success rate</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">10,000+</p>
              <p className="text-gray-600">Active users</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">30,000+</p>
              <p className="text-gray-600">Mock interviews conducted</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">94%</p>
              <p className="text-gray-600">User satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
