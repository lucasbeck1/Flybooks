import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import Gonza from '../../assets/Gonza.jpg';
import Juampi from '../../assets/Juampi.jpg';
import Karen from '../../assets/Karen.jpg';
import Lucas from '../../assets/Lucas.jpg';
import Toto from '../../assets/Toto.jpg';
import Header from '../../components/header/Header.jsx';
import Footer from '../Footer/Footer';
import s from './About.module.css';




export default function About() {
  return (
    <>
      < Header />
      <div className={s.container_About}>

        <div className={s.pharagraph}>
          <p>

            Application developed by the SoyHenry® student team <br />
            Implementation of Javascript - NodeJs - Express - MongoDB - Mongoose - React -
            Redux - Stripe - Material UI - Passport - Vercel - Railway

          </p>
        </div>

        <div className={s.devs}>
          <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={12} sm={6} md={4}>
                <div className={s.Profile}>
                  <img
                    className={s.photo}
                    src={Gonza}
                    alt="not found"
                    height={120}
                    width={120}
                  />
                  <h3>GONZALO ARUQUIPA</h3>
                  <ul className={s.icon}>
                    <li>

                      <a href="https://www.linkedin.com/in/gonzalo-aruquipa-901b3015b/">
                        <BsLinkedin size={30} />
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/Gonzalo-Aruquipa">
                        <BsGithub size={30} />
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>


              <Grid item xs={12} sm={6} md={4}>
                <div className={s.Profile}>
                  <img
                    className={s.photo}
                    src={Juampi}
                    alt="not found"
                    height={120}
                    width={120}
                  />
                  <h3>JUAN PABLO MORENO MARTINEZ</h3>
                  <ul className={s.icon}>
                    <li>

                      <a href="https://linkedin.com/in/juan-pablo-moreno-martinez-73206b258">
                        <BsLinkedin size={30} />
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/Juanmoreno98">
                        <BsGithub size={30} />
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className={s.Profile}>
                  <img
                    className={s.photo}
                    src={Karen}
                    alt="not found"
                    height={120}
                    width={120}
                  />
                  <h3>KAREN DIANNE MEMMEL</h3>
                  <ul className={s.icon}>
                    <li>

                      <a href="https://www.linkedin.com/in/karen-dianne-103201261/">
                        <BsLinkedin size={30} />
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/DianneMem">
                        <BsGithub size={30} />
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <div className={s.Profile}>
                  <img
                    className={s.photo}
                    src={Lucas}
                    alt="not found"
                    height={120}
                    width={120}
                  />
                  <h3>LUCAS BECKFORD</h3>
                  <ul className={s.icon}>
                    <li>

                      <a href="https://www.linkedin.com/in/lucas-jbec/">
                        <BsLinkedin size={30} />
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/lucasbeck1">
                        <BsGithub size={30} />
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <div className={s.Profile}>
                  <img
                    className={s.photo}
                    src={Toto}
                    alt="not found"
                    height={120}
                    width={120}
                  />
                  <h3>TOMAS VALVERDE</h3>
                  <ul className={s.icon}>
                    <li>

                      <a href="https://www.linkedin.com/in/tomas-valverde-3579661b7/">
                        <BsLinkedin size={30} />
                      </a>
                    </li>
                    <li>
                      <a href="https://github.com/totovalv">
                        <BsGithub size={30} />
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>

            </Grid>
          </Box>


        </div>

      </div>

      <Footer />
    </>
  )
}

