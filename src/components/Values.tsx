import Image from "next/image";
import { Container } from "./Container";
import { WheatIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import Spinner from "./Spinner";

const Values = async () => {
    const supabase = createClient()

    let { data: values, error } = await supabase
        .from('Values')
        .select('*')
        .order('id', { ascending: true })

    if (!values) {
        return (
            <Container className="flex flex-col justify-center items-center lg:flex-row lg:items-start">
                <Spinner />
            </Container>
        )
    }

    return (
        <Container className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
            {/* Mission */}

            <div className="w-full flex-1 mt-8 p-8 order-2 bg-white dark:bg-gray-900 shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-1 lg:rounded-r-none hover:bg-green-400 hover:text-white">
                <div className="mb-7 pb-7 flex items-center justify-center border-b border-gray-300">
                    <WheatIcon className="w-10 h-10 rounded-3xl text-green-600" />
                    <div className="text-center ml-4">
                        <span className="block text-xl lg:text-2xl font-semibold dark:text-white">{values[0].title}</span>
                    </div>
                </div>
                <p className="mb-7 font-medium text-gray-500 text-lg dark:text-white">{values[0].description}</p>
            </div>

            {/* Vision */}
            <div className="w-full flex-1 p-8 order-1 shadow-xl rounded-3xl bg-gray-900 text-gray-400 sm:w-96 lg:w-full lg:order-2 lg:mt-0 hover:bg-green-400 hover:text-white">
                <div className="mb-8 pb-8 flex items-center justify-center border-b border-gray-600">
                    <WheatIcon className="w-10 h-10 rounded-3xl text-green-600" />
                    <div className="text-center ml-4">
                        <span className="block text-2xl lg:text-3xl font-semibold text-white">{values[1].title}</span>
                    </div>
                </div>
                <p className="mb-10 font-medium text-xl dark:text-white">{values[1].description}</p>
            </div>
            {/* Values */}
            <div className="w-full flex-1 mt-8 p-8 order-3 bg-white dark:bg-gray-900 shadow-xl rounded-3xl sm:w-96 lg:w-full lg:order-3 lg:rounded-l-none hover:bg-green-400 hover:text-white mb-">
                <div className="mb-7 pb-7 flex items-center justify-center border-b border-gray-300">
                    <WheatIcon className="w-10 h-10 rounded-3xl text-green-600" />
                    <div className="text-cente ml-4">
                        <span className="block text-xl lg:text-2xl font-semibold dark:text-white">{values[2].title}</span>
                    </div>
                </div>
                <p className="mb-7 font-medium text-gray-500 text-lg dark:text-white">{values[2].description}</p>
            </div>
        </Container>
    )
}
export default Values;

