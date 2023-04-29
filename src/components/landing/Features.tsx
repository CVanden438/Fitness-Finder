import React from "react";
import useScroll from "../../hooks/useScroll";
import BookIcon from "../../icons/BookIcon";
import ListIcon from "../../icons/ListIcon";
import FriendIcon from "../../icons/FriendIcon";

const Features = () => {
  return (
    <section className="flex min-h-screen flex-col gap-8 p-5">
      <h2 className="text-center text-5xl font-bold">Features</h2>
      <div className="h-1 w-full bg-yellow-500"></div>
      <div className="grid grid-cols-1 gap-4 text-2xl md:grid-cols-2 lg:grid-cols-3">
        <article className="bg-gray-900 p-3 outline outline-2 outline-yellow-500">
          <BookIcon height={90} width={90} classNames="m-auto" />
          <p>
            With our app, booking fitness classes has never been easier. You can
            browse through a wide range of classes and book your spot with just
            a few clicks. Our app also allows you to track your classes, so you
            can stay on top of your fitness goals. Payment is made easy, so you
            can focus on your workouts without worrying about the logistics. Our
            friends features also allows you to easily make plans and organise
            joining classes together!
          </p>
        </article>
        <article className=" bg-gray-900 p-3 outline outline-2 outline-yellow-500">
          <ListIcon height={90} width={90} classNames="m-auto" />
          <p>
            Setting daily fitness goals and tracking your progress is key to
            achieving your overall fitness goals. With the help of our fitness
            app, you can set daily goals that are tailored to your fitness level
            and preferences. Whether you want to increase your daily steps, lift
            more weights, or run longer distances, our app makes it easy to set
            and track your goals. You can also monitor your progress over time,
            making it easier to see how far you've come and identify areas where
            you can improve. With our app, you'll have all the tools you need to
            achieve your fitness goals and stay motivated along the way.
          </p>
        </article>
        <article className=" bg-gray-900 p-3 outline outline-2 outline-yellow-500">
          <FriendIcon height={90} width={90} classNames="m-auto" />
          <p>
            Adding friends and building a community of like-minded individuals
            is a great way to stay motivated and accountable on your fitness
            journey. Our fitness app makes it easy to connect with friends and
            share your progress with each other. You can discuss your fitness
            goals and strategies, offer encouragement, and cheer each other on
            with reactions. Whether you're looking for a workout buddy, someone
            to share tips with, or just a little extra motivation, our app is
            the perfect platform to connect with others who share your passion
            for fitness. So why not invite some friends to join you on your
            fitness journey and start building a supportive community today?
          </p>
        </article>
      </div>
    </section>
  );
};

export default Features;
