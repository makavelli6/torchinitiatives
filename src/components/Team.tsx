import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

import userOneImg from "../../public/img/user1.jpeg";
import userTwoImg from "../../public/img/user2.jpeg";
import userThreeImg from "../../public/img/user3.jpeg";
import userFourImg from "../../public/img/user4.jpeg";
import userFiveImg from "../../public/img/user5.jpeg";
import { createClient } from "@/utils/supabase/server";
import Spinner from "./Spinner";

export const Team= async () => {
  const supabase = createClient();
    const { data: teams, error } = await supabase
        .from('Team')
        .select('*')
        .order('id', { ascending: true });
    if (!teams) {
        return (
            <Container className="flex flex-col justify-between items-center lg:flex-row lg:items-start">
                <Spinner />
            </Container>
        )
    }
  return (
    <Container>
  <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
    {teams.map((team, index) => (
      <div key={index} className="lg:col-span-1 xl:col-auto">
        <div className="flex flex-col justify-center w-full h-full bg-gray-100 px-14 py-14 rounded-2xl dark:bg-trueGray-800">
          <Avatar
            image={team.imageSrc}
            name={team.name}
            title={team.title}
          />
          <p className="leading-normal text-lg">{team.description}</p>
        </div>
      </div>
    ))}
  </div>
</Container>

  );
};

interface AvatarProps {
  image: string;
  name: string;
  title: string;
}

function Avatar(props: Readonly<AvatarProps>) {
  return (
    <div className="flex flex-col items-center justify-center mb-4">
  <div className="flex-shrink-0 flex relative w-40 h-40 overflow-hidden rounded-full ">
    <Image
      src={`${props.image}?t=${new Date().getTime()}`}
      className="w-full h-full"
      alt="Avatar"
      fill
    />
  </div>
  <div className="text-center mt-2">
    <div className="text-lg font-medium">{props.name}</div>
    <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
  </div>
</div>

  );
}

