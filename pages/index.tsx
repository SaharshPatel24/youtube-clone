import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import VideoCard from './card';
import { SimpleGrid } from '@chakra-ui/react';

const Home = () => {
  const [query, setQuery] = useState("");

  const { isLoading, error, data, refetch } = useQuery('repoData', () =>
    fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=%20' + query + '&key=AIzaSyAxd5S2TAk2vhoQdhzSZqKDNTv_ok_-yos').then(res =>
      res.json().then(data => data.items),
    )
  )

  useEffect(() => {
    refetch();
  }, [query])
  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error

  return (
    <div className="home">
      <div className="searchbar">
        <input type="text" placeholder="Search" onChange={e => setQuery(e.target.value)}></input><button className="search">Search</button>
      </div>
      <SimpleGrid columns={[2, null, 4]} minChildWidth={345} spacing={4} style={{ width: '75%', margin: "5% 10% 5% 13%" }}>
        {
          data.map((data: any, i: any) => {
            return <VideoCard snippet={data} key={i}></VideoCard>
          })
        }
      </SimpleGrid>
    </div>
  )
}

export default Home
