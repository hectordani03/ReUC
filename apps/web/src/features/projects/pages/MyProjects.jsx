import React from 'react';
import MyProjectsList from '../components/MyProjectsList';

const MyProjects = () => {
  return (
    <section className="flex flex-col items-center w-full min-h-screen px-10 pt-10">
      <h1 className="text-5xl font-bold mb-8">
        Mis <span className="text-lime-600">proyectos</span>
      </h1>

      <MyProjectsList />
    </section>
  );
};

export default MyProjects;
