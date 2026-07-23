import Hero from '../sections/Hero';
import SelectedWork from '../sections/SelectedWork';
import Capabilities from '../sections/Capabilities';
import BuildNotes from '../sections/BuildNotes';
import ExperienceEducation from '../sections/ExperienceEducation';
import About from '../sections/About';
import ContactFooter from '../sections/ContactFooter';
import Training from '../sections/Training';
import {
  about,
  buildNotes,
  capabilityGroups,
  contact,
  hero,
  identity,
  projects,
  training,
  timeline,
} from '../data/portfolio';

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero identity={identity} hero={hero} projects={projects} />
        <SelectedWork projects={projects} />
        <Capabilities groups={capabilityGroups} />
        <BuildNotes notes={buildNotes} />
        <Training training={training} />
        <ExperienceEducation timeline={timeline} />
        <About about={about} identity={identity} />
      </main>
      <ContactFooter contact={contact} identity={identity} />
    </>
  );
}
