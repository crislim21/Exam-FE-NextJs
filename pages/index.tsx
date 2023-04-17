import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Restaurant } from '@/functions/swagger/BackEnd';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import { Page } from '@/types/Page'; 
import { Alert} from 'antd';
import Link from 'next/link';
import useSwr from 'swr';

const RestaurantTableRow: React.FC<{
    restaurant: Restaurant
}> = ({restaurant}) => {

    return(
        <div className='border border-gray-400 rounded-xl p-6 flex flex-col items-center bg-white shadow-lg'>
            <div className='bg-slate-400 h-[160px] w-full'></div>
            <div className='mt-4 font-bold'>{restaurant.name}</div>
            <Link href={`/restaurant/${restaurant.id}`} className="mr-2 py-3 text-xs w-full text-center bg-blue-500 active:bg-blue-700 text-white rounded-lg">
                View
            </Link>
        </div>
    );
};

const IndexPage: Page = () => {
    const swrFetcher = useSwrFetcherWithAccessToken();
    const { data, error} = useSwr<Restaurant[]>('/api/be/api/Restaurants', swrFetcher);
   
    return (
        <div>
            <Title>Restaurant</Title>
            
            {Boolean(error) && <Alert type='error' message='cannot get restaurant data' description={error}></Alert>}
            <div className='grid grid-cols-5 gap-5'>
                {data?.map((x, i) => <RestaurantTableRow key={i} restaurant={x} ></RestaurantTableRow>)}
            </div>

            
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;