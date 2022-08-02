import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';

export interface  DetailPageProps {
  post:any,
}

export default function DetailPage ({post}:  DetailPageProps) {
    const router = useRouter()
    console.log(router)
    if(router.isFallback){
      return "<div>Loadding...</div>"
    }
    if(!post) return null;

  return (
    <div>
      <h1>Detail page post</h1>
      <p>{post.title}</p>
      <p>{post.author}</p>
      <p>{post.description}</p>
    </div>
  );
}

export const getStaticPaths:GetStaticPaths = async()=>{
  const repons = await fetch('https:js-post-api.herokuapp.com/api/posts?_page=1')
  const data = await repons.json()
  return{
    paths: data.data.map((post:any) =>({params:{postId:post.id}})),
    fallback:true
  }
}

export const getStaticProps: GetStaticProps<DetailPageProps> = async(context:GetStaticPropsContext) =>{

  const postId = context.params?.postId;
  if(!postId) return {notFound:true}
  const repons = await fetch(`https:js-post-api.herokuapp.com/api/posts/${postId}`)
  const data = await repons.json()
  return {
    props:{
      post:data
    },
    revalidate:5,  //ISR
  }
}
