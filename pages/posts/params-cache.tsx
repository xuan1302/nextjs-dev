import { GetServerSidePropsContext } from 'next';
import * as React from 'react';

export interface  AllparamPageProps {
  post:any,
}

export default function AllparamPage ({post}:  AllparamPageProps) {
  console.log(post)
  return (
    <div>
      AllParam page
      {post?.title}
      {post?.title}
      {post?.description}
    </div>
  );
}

export async function getServerSideProps(context:GetServerSidePropsContext){
  context.res.setHeader('Cache-Control','s-maxage=5')
  await new Promise((res) => {
    setTimeout(res,300)
  })
  const postId = context.query.postId;
  if(!postId) return {props:{query:context.query}}
  const repons = await fetch(`https:js-post-api.herokuapp.com/api/posts/${postId}`)
  const data = await repons.json()
  return{
    props:{
      post:data
    }
  }
}