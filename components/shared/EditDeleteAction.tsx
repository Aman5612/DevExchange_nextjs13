"use client";
import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { toast } from "../ui/use-toast";

interface Props {
  type: string;
  itemId: string;
}

const EditDeleteAction = ({ type, itemId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const handleEdit = () => {
    router.push(`/profile/edit/${JSON.parse(itemId)}`);
  };
  const handleDelete = async () => {
    try {
      if (type === "question") {
        await deleteQuestion({
          questionId: JSON.parse(itemId),
          path: pathname,
        });

        toast({
          title: "Question Deleted Successfully",
          // description: "Your question has been deleted successfully",
        });
      }
      if (type === "answer") {
        await deleteAnswer({
          answerId: JSON.parse(itemId),
          path: pathname,
        });

        toast({
          title: "Answer Deleted Successfully",
          // description: "Your answer has been deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting. Please try again.",
      });
    }
  };
  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "question" && (
        <Image
          src="/assets/icons/edit.svg"
          width={14}
          height={14}
          alt="Edit"
          onClick={handleEdit}
          className="cursor-pointer"
        />
      )}
      <Image
        src="/assets/icons/trash.svg"
        width={14}
        height={14}
        alt="Edit"
        onClick={handleDelete}
        className="cursor-pointer"
      />
    </div>
  );
};

export default EditDeleteAction;
