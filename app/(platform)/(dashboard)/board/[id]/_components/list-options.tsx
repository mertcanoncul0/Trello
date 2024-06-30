"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
    data: List;
    onAddCard: () => void;
};

const ListOptions = ({
    data,
    onAddCard
}: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<"button">>(null);
    
    const { execute: executeDelete } = useAction(deleteList, {
        onSucess: (data) => {
            toast.success(`The list named "${data.title}" has been deleted`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);
            console.log(error);
        }
    });

    const onDeleteHandle = (formData: FormData) => {
        const { id, boardId } = Object.fromEntries(formData) as { id: string, boardId: string };

        executeDelete({
            id,
            boardId
        });
    };

    const { execute: executeCopy } = useAction(copyList, {
        onSucess: (data) => {
            toast.success(`The list named "${data.title.split("-")[0]}" has been copied`);
            closeRef.current?.click();
        },
        onError: (error) => {
            toast.error(error);            
        }
    });

    const onCopyHandle = (formData: FormData) => {
        const { id, boardId } = Object.fromEntries(formData) as { id: string, boardId: string };
        executeCopy({
            id,
            boardId
        });
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="h-auto w-auto p-2" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
                <PopoverClose ref={closeRef} asChild>
                    <Button className="h-auto w-auto absolute p-2 top-2 right-2 text-neutral-600" variant="ghost">
                        <X className="h-4 w-4" />
                    </Button>
                </PopoverClose>

                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    {data.title}
                </div>

                <Button
                    onClick={onAddCard}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    variant="ghost"
                >
                    Add card...
                </Button>
                <form action={onCopyHandle}>
                    <input hidden id="id" name="id" value={data.id} />
                    <input hidden id="boardId" name="boardId" value={data.boardId} />
                    <FormSubmit
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                        variant="ghost"
                    >
                        Copy list...
                    </FormSubmit>
                </form>

                <Separator />

                <form action={onDeleteHandle}>
                    <input hidden id="id" name="id" value={data.id} />
                    <input hidden id="boardId" name="boardId" value={data.boardId} />
                    <FormSubmit
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                        variant="ghost"
                    >
                        Delete this list...
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    );
};

export default ListOptions;