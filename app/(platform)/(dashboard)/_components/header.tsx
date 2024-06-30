"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { MobileSidebar } from "./mobile-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { FormPopover } from "@/components/form/form-popover";

const Header = () => {
    return (
        <header className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
            <MobileSidebar />
            <div className="flex items-center gap-x-4 w-full">
                <Logo />
                <FormPopover align="start" side="bottom" sideOffset={18}>
                    <Button size="sm" variant="primary" className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                        Create
                    </Button>
                </FormPopover>
                <FormPopover align="start" side="bottom" sideOffset={18}>
                    <Button size="sm" variant="primary" className="rounded-sm block md:hidden">
                        <Plus />
                    </Button>
                </FormPopover>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher 
                    hidePersonal
                    afterCreateOrganizationUrl="/organization/:id"
                    afterSelectOrganizationUrl="/organization/:id"
                    afterLeaveOrganizationUrl="/select-org"
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            },
                        },
                    }}
                />
                <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                width: 30,
                                height: 30
                            }
                        }
                    }}
                />
            </div>
        </header>
    );
};

export default Header;