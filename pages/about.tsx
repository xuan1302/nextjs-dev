import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import  React, { useEffect, useState } from 'react';
// import Header from '../component/Header';

const Header = dynamic(()=>import ('../component/Header'),{ssr:false})
export interface AboutPageProps {
}

export default function AboutPage (props: AboutPageProps) {
  const [postList,setPostList] = useState([])
  const router = useRouter()
  const page = Number(router.query?.page) || 1;

  useEffect(()=>{
    if(!page) return;
    (
      async()=>{
        const repons = await fetch(`https:js-post-api.herokuapp.com/api/posts?_page=${page}`)
        const data = await repons.json()
        setPostList(data.data)
      }
    )();
  },[page])
  const handleClickNextPage = ()=>{
    router.push({
      pathname:'/about',
      query:{
        page:Number( router.query.page || 1) + 1
      }
    },undefined,
    {shallow:true}) //khong chay trong sever
  }
  return (
    <div>
      <h1>About Page</h1>
      <Header />
      <ul className='post-list'>
        {postList.map((post:any)=>(<li key={post.id}>{post.title}</li>))}
      </ul>
      <button onClick={handleClickNextPage}>Next page</button>
    </div>
  );
}
