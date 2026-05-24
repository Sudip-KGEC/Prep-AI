

import PageHeader from "@/components/reusables";
import ExploreGridCard from "./_components/ExploreGridCard";
import { getInterviewers } from "@/actions/explore";

export const metadata = {
  title: "expolre"
};

export default async function explorePage () {

    const interviewer = await getInterviewers();


    return (
        <main className='min-h-screen'>
            {/* page header */}
            <PageHeader label="Explore" gray="Find Your" purple="expert interviewer" description="Browse senior engineers from top companies." />

            {/* page content component */}

            <div className="max-w-6xl mx-auto px-8 xl:px-0 py-10">
               <ExploreGridCard  interviewer= {interviewer}/>
            </div>
        </main>
    );
}

