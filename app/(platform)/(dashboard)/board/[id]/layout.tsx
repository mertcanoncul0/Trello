import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import BoardHeader from "./_components/board-header";

interface BoardIdLayoutProps {
    children: React.ReactNode;
    params: { id: string };
};

export const generateMetadata = async ({
    params
}: {
    params: { id: string }
}) => {
    const { orgId } = auth();

    if (!orgId) { 
        return {
            title: "Board",
        };
    };

    const board = await db.board.findUnique({
        where: {
            id: params.id,
            orgId,
        },
    });

    return {
        title: board?.title || "Board",
    };
}

const BoardIdLayout = async ({
    children,
    params
}: BoardIdLayoutProps) => {
    const { orgId } = auth();

    if (!orgId) {
        redirect("/select-org");
    }

    const board = await db.board.findUnique({
        where: {
            id: params.id,
            orgId
        },
    });

    if (!board) {
        notFound();
    }

    return (
        <div
            className="relative h-full bg-no-repeat bg-cover bg-center"
            style={{backgroundImage: `url(${board.imageFullUrl})`}}
        >
            <BoardHeader data={board} />
            <div className="absolute inset-0 bg-black/10" />
            <main className="relative pt-28 h-full">
                {children}
            </main>
        </div>
    )
}

export default BoardIdLayout;