import NewMeetupForm from "@/components/meetups/NewMeetupForm";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

const NewMeetupPage = () => {
  const router = useRouter();

  const addMeetup = async (meetupData) => {
    console.log(meetupData);
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      "Content-Type": "application/json",
    });

    const data = await response.json();

    //router.replace('/'); Makes it so they can't go back
    router.push("/");
  };

  return (
    <Fragment>
      <Head><title>Add a New Meetup</title>
      <meta name="description" content="Add a new meetup tohave friends come find you!"/></Head>
      <NewMeetupForm onAddMeetup={addMeetup} />
    </Fragment>
  );
};

export default NewMeetupPage;
