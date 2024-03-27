"use client";
import React, { useRef, useState } from "react";
import OpenAI from "openai";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { Answers } from "@/lib/validations";
import { z } from "zod";
import { useTheme } from "@/context/ThemeProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";
import axios from "axios";

interface Props {
  authorId: string;
  question: string;
  questionId: string;
  questionTitle: string;
}

const Answer = ({ authorId, question, questionTitle, questionId }: Props) => {
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme() as { theme: string };
  const [aiAnswer, setAiAnswer] = useState(false);
  const questionData = questionTitle + " " + question;
  const [answerContent, setAnswerContent] = useState("");

  const form = useForm<z.infer<typeof Answers>>({
    resolver: zodResolver(Answers),
    defaultValues: {
      answer: "",
    },
  });
  const editorRef = useRef(null);

  const handleCreateAnswer = async (values: z.infer<typeof Answers>) => {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.answer,
        author: JSON.parse(authorId),
        question: JSON.parse(questionId),
        path: pathname,
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateAiAnswer = async () => {
    setAiAnswer(true);
    try {
      const options = {
        method: "POST",
        url: "https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "3ba754518amsh12eee2feca0cc36p12b945jsnb1cb76548f4e",
          "X-RapidAPI-Host":
            "cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com",
        },
        data: {
          messages: [
            {
              role: "user",
              content: questionData,
            },
          ],
          model: "gpt-4-turbo-preview",
          max_tokens: 200,
          temperature: 0.9,
        },
      };
      const response = await axios.request(options);
      setAnswerContent(response.data.choices[0].message.content);
    } catch (error) {
      console.error(error);
    } finally {
      setAiAnswer(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4
          className="paragraph-semibold text-dark400_light800 mt-5
        "
        >
          Write your answer here
        </h4>
        <Button
          disabled={aiAnswer}
          className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500"
          onClick={generateAiAnswer}
        >
          <Image
            src="/assets/icons/stars.svg"
            alt="star"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an AI Answer
        </Button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleCreateAnswer)}
          className="mt-6 flex w-full flex-col gap-10"
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  <Editor
                    apiKey="eto7c3hbsihps9q4k9awbl12u62e6u9xtv3tbmhgzbh0keg7"
                    onInit={(evt, editor) => {
                      // @ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => {
                      field.onChange(content);
                    }}
                    initialValue={answerContent}
                    init={{
                      height: 350,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                      ],
                      toolbar:
                        "undo redo |" +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist | ",
                      content_style:
                        "body { font-family:Inter,sans-serif; font-size:16px,bacground-color: #858EAD; }",
                      skin: theme === "dark" ? "oxide-dark" : "oxide",
                      content_css: theme === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500"></FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className=" flex justify-end">
            <Button
              type="submit"
              className="primary-gradient w-fit text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting" : "Post Answer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
