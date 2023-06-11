import Head from "next/head"; // Meta STuff
import { MongoClient } from "mongodb";

import MeetupList from "@/components/meetups/MeetupList";
import { Fragment } from "react";

export default function Home(props) {
  return (
    <Fragment>
      <Head>
        <title>React Title</title> { /* Tab Title */}
        <meta name="description" content="Browse ahuge list of highly active React meetings"/> { /* Search Engine description */}
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

//Server Side Code - Client will not see
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//    fetch data from API
//   return { props: { meetups: DUMMY_MEETUPS } };
// }

// Faster - Should be used if data doesn't change multiple times a second
export async function getStaticProps() {
  // fetch data from API
  const client = await MongoClient.connect(
    "mongodb+srv://morgenthalerhowie:jKF51LwWQkpsJf9o@cluster0.tel5fgh.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1, //Updates the page every x seconds
  };
}
