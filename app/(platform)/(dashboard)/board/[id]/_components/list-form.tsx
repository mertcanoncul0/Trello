"use client";

import { FormInput } from "@/components/form/form-input";
import ListWrapper from "./list-wrapper";

import { Plus, X } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { useState, ElementRef, useRef } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

const ListForm = () => {
    const router = useRouter();
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);
    const inputRef = useRef<ElementRef<"input">>(null);
    const [isEditing, setIsEditing] = useState(false);

    const enabledEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        });
    }

    const disableEditing = () => setIsEditing(false);

    const { execute, fieldErrors } = useAction(createList, {
        onSucess: (data) => {
            toast.success(`List ${data.title} created.`);
            disableEditing();
            router.refresh();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && disableEditing();

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const boardId = formData.get("boardId") as string;

        execute({
            title,
            boardId
        });
    }

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    if (isEditing) {
        
        return (
            <ListWrapper>
                <form
                    action={onSubmit}
                    ref={formRef}
                    className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
                >
                    <FormInput 
                        ref={inputRef}
                        errors={fieldErrors}
                        id="title"
                        className="text-sm px-2 py-1 h-7 font-medium border-transparent
                        hover:border-input focus:border-input transition"
                        placeholder="Enter list title..."
                    />
                    <input 
                        hidden
                        value={params.id}
                        name="boardId"
                    />
                    <div className="flex items-center gap-x-1">
                        <FormSubmit>
                            Add list
                        </FormSubmit>
                        <Button 
                            onClick={disableEditing}
                            size="sm"
                            variant="ghost"
                            
                        >
                            <X className="h-5 w-5"/>
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
                <button
                    onClick={enabledEditing}
                    className="w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3
                    flex items-center font-medium text-sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Add a list
                </button>
        </ListWrapper>
    );
};

export default ListForm;