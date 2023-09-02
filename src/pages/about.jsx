import {Component} from "react";
import Head from "next/head";
import Footer from "../components/pages/home/footer/Footer";
import AboutDetailComponent from "../components/pages/about/aboutDetailComponent/AboutDetailComponent";
import aboutImage from "../public/images/property_1.png"
import visionImage from "../public/images/property_2.png"
import missionImage from "../public/images/property_3.png"
import TeamCard from "../components/pages/about/teamCard/TeamCard";
import AboutStyle from "../styles/componentStyles/aboutStyles/About.module.css"


export default class About extends Component {
    render() {
        return (
            <div>
                <Head>
                    <title>About Us</title>
                    <link rel="stylesheet"
                          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,1,0"/>
                </Head>
                <AboutDetailComponent heading={"About Us"}
                                      desc={"Lorem ipsum dolor sit amet consetetur, est ac poritor eli neque in ac erat justo vulputate. Ut quis diam feugita adipcing at elita elget scelarisque doec Feuigia at elmentum viverra facuubs adipscing viteae etiam ame eu. Sit vauputate leo curabitur neque seuspendisse havitasse eget."}
                                      image={aboutImage}/>
                <AboutDetailComponent heading={"Our Vision"}
                                      desc={"Lorem ipsum dolor sit amet consetetur, est ac poritor eli neque in ac erat justo vulputate. Ut quis diam feugita adipcing at elita elget scelarisque doec Feuigia at elmentum viverra facuubs adipscing viteae etiam ame eu. Sit vauputate leo curabitur neque seuspendisse havitasse eget."}
                                      image={visionImage}/>
                <AboutDetailComponent heading={"Our Mission"}
                                      desc={"Lorem ipsum dolor sit amet consetetur, est ac poritor eli neque in ac erat justo vulputate. Ut quis diam feugita adipcing at elita elget scelarisque doec Feuigia at elmentum viverra facuubs adipscing viteae etiam ame eu. Sit vauputate leo curabitur neque seuspendisse havitasse eget."}
                                      image={missionImage}/>

                <div className={AboutStyle["about__team"]}>
                    <h1 className={AboutStyle["about__team-heading"]}>Our Team</h1>
                    <div className={AboutStyle["about__team-wrapper"]}>
                        <TeamCard image={aboutImage}
                                  desc={"Lorem ipsum dolor sit amet consetetur, est ac poritor eli neque in ac erat justo vulputate. Ut quis diam feugita adipcing at elita elget scelarisque doec Feuigia at elmentum viverra facuubs adipscing viteae etiam ame eu. Sit vauputate leo curabitur neque seuspendisse havitasse eget."}/>
                        <TeamCard image={aboutImage}
                                  desc={"Lorem ipsum dolor sit amet consetetur, est ac poritor eli neque in ac erat justo vulputate. Ut quis diam feugita adipcing at elita elget scelarisque doec Feuigia at elmentum viverra facuubs adipscing viteae etiam ame eu. Sit vauputate leo curabitur neque seuspendisse havitasse eget."}/>
                        <TeamCard image={aboutImage}
                                  desc={"Lorem ipsum dolor sit amet consetetur, est ac poritor eli neque in ac erat justo vulputate. Ut quis diam feugita adipcing at elita elget scelarisque doec Feuigia at elmentum viverra facuubs adipscing viteae etiam ame eu. Sit vauputate leo curabitur neque seuspendisse havitasse eget."}/>
                        <TeamCard image={aboutImage}
                                  desc={"Lorem ipsum dolor sit amet consetetur, est ac poritor eli neque in ac erat justo vulputate. Ut quis diam feugita adipcing at elita elget scelarisque doec Feuigia at elmentum viverra facuubs adipscing viteae etiam ame eu. Sit vauputate leo curabitur neque seuspendisse havitasse eget."}/>
                    </div>
                </div>
                <Footer/>
                {/*<ImageViewPopUp />*/}
            </div>
        )
    }
}
