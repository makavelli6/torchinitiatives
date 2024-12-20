
import { TeamMember } from '@/types';
import FormSection from './FormContent';
import Image from 'next/image';

type PageContentProps = {
    teams: TeamMember[];
    onEdit: (benefit: TeamMember) => void;
    formData: TeamMember;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    isSubmitting: boolean;
    message: {
        type: "success" | "error";
        text: string;
    } | null
};

const TeamCard = (
    { team, onEdit }: {
        team: TeamMember,
        onEdit: (team: TeamMember) => void
    }) => (
    <div className="relative flex w-f
    ll max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative m-0 w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none bg-white bg-clip-border text-gray-700">
            <Image
                src={team.imageSrc}
                alt="image"
                className="h-full w-full object-cover"
                fill
            />
        </div>
        <div className="p-6">
            <h6 className="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                {team.name}
            </h6>
            <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {team.title}
            </h4>
            <p className="mb-8 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                {team.description}
            </p>
            <button
                className="flex select-none items-center gap-2 rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-pink-500 transition-all hover:bg-pink-500/10 active:bg-pink-500/30"
                type="button"
                onClick={() => onEdit(team)}
            >
                Edit
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-4 w-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    ></path>
                </svg>
            </button>
        </div>
    </div>
);


const PageContent: React.FC<PageContentProps> = (
    { teams,
        onEdit,
        formData,
        onChange,
        handleSubmit,
        handleFileChange,
        file,
        isSubmitting,
        message
    }) => (
    <div id="main-content" className="h-screen w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
        <main>
            <div className="pt-6 px-4">
                <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {teams.map((team) => (
                        <TeamCard team={team} onEdit={onEdit} key={team.id} />
                    ))}
                </div>
                <FormSection formData={formData} onChange={onChange} message={message} handleSubmit={handleSubmit} handleFileChange={handleFileChange} file={file} isSubmitting={isSubmitting} />
            </div>
        </main>
    </div>
);
export default PageContent;