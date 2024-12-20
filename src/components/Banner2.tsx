import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import Spinner from './Spinner';
const Banner2 = async () => {
  const supabase = createClient();
  let { data } = supabase.storage
    .from('images')
    .getPublicUrl('Banner/banner.jpeg');;

  if (!data) {
    return (
      <div
        className='container mx-auto xl:px-0 flex items-center justify-center dark:bg-[#171717]'
      >                
      <Spinner />
      </div>
    )
  }
  return (

    <div
      className='container mx-auto xl:px-0 flex items-center justify-center dark:bg-[#171717]'
    >
      <Image
        src={'/img/banner.jpg'}
        alt='Plant'
        width={'1920'}
        height={'1080'}
        className="relative z-0 w-full  bg-contain bg-center bg-no-repeat sm:rounded-lg"
      />

    </div>

  )
}
export default Banner2;