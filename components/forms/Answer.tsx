"use client";
import React, { useRef, useState } from "react";
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

const Answer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const form = useForm<z.infer<typeof Answers>>({
    resolver: zodResolver(Answers),
    defaultValues: {
      answer: "",
    },
  });
  const editorRef = useRef();

  const handleCreateAnswer = async (values: z.infer<typeof Answers>) => {
    setIsSubmitting(true);
    try {
      await createAnswer({
        content: values.content,
        author: JSON.parse(mongoUserId),
        path: pathname,
      });
      router.push("/");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 shadow-none dark:text-primary-500">
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
              type="button"
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