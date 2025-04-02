import Image from "next/image";
import Link from "next/link";
type ProjectCardProps = {
    id: string;
    title: string;
    description: string;
    image: string;
}

export default function ProjectCard({id, title, description, image}: ProjectCardProps) {
    return (
        <div>
            <Image width={500} height={500} src={image} alt={title} className="w-full h-[400px] object-cover rounded mb-4" />
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                <h3 className="text-xl uppercase font-geologica">{title}</h3>
                <p className="text-gray-600">{description}</p>
                </div>
                <div className="text-end self-end">
                    <Link href={`/projects/${id}`}>Lees meer</Link>
                </div>
            </div>
        </div>
    )
}