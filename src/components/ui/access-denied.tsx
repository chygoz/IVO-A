
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

interface AccessDeniedProps {
    returnTo: string;
    title?: string;
    message?: string;
}

export default function AccessDenied({ returnTo, title, message }: AccessDeniedProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center mt-20">
            <TriangleAlert className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-bold mb-2">{title || "Access Denied"}</h1>
            <p className="text-gray-600 mb-4">{message || "You do not have permission to view this page."}</p>
            <Link href={returnTo}>
                <p className="text-blue-500 hover:underline">Go Back</p>
            </Link>
        </div>
    );
}
