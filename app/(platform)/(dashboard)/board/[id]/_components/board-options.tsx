"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import { Popover, PopoverClose, PopoverContent } from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";


interface BoardOptionsProps {
    id: string
};

const BoardOptions = ({ id }: BoardOptionsProps) => {
    const { execute, isLoading } = useAction(deleteBoard, {
        onError: (error) => {
            toast.error(error);
        },
    });

    const onDelete = () => execute({ id });

    return (
        <Popover>
            <PopoverTrigger>
                <Button className="h-auto w-auto p-2" variant="transparent">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>

            <PopoverContent 
                className="px-0 pt-3 pb-3" 
                side="bottom"
                align="start"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Board Actions
                </div>
                <PopoverClose>
                    <Button 
                        variant="ghost" 
                        className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
                    >
                        <X className="w-4 h-4"/>
                    </Button>
                </PopoverClose>
                <Button
                    variant="ghost"
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    onClick={onDelete}
                    disabled={isLoading}
                >
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    );
};

export default BoardOptions;