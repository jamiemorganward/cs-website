import { PageTitle } from '../page-title/PageTitle'
import { UnderlineAnimation } from '../underline-animation/UnderlineAnimation'
import s from './ContactPage.module.scss'

export const ContactPage = () => {
  return (
    <div>
      <PageTitle title="Contact" />
      <div className={s.contactInfoWrapper}>
        <div className={s.contactInfoBlock}>
          <h2 className={s.title}>Enquire</h2>
          <UnderlineAnimation>
            <a href="mailto:hello@clicksuite.co.nz">hello@clicksuite.co.nz</a>
          </UnderlineAnimation>
        </div>
        <div className={s.contactInfoBlock}>
          <h2 className={s.title}>Join the team</h2>
          <UnderlineAnimation>
            <a href="mailto:join@clicksuite.co.nz">join@clicksuite.co.nz</a>
          </UnderlineAnimation>
        </div>
        <div className={s.contactInfoBlock}>
          <h2 className={s.title}>Location</h2>
          <UnderlineAnimation>
            <a
              href="https://maps.app.goo.gl/WBUTwgX2taUEUCwG7"
              target="_blank"
              style={{ textDecoration: 'none' }}
            >
              <p>
                17 Garrett Street,<br></br>
                Te Aro, Wellington 6011
              </p>
            </a>
          </UnderlineAnimation>
        </div>
        <div className={s.contactInfoBlock}>
          <h2 className={s.title}>Social</h2>
          <p>
            <UnderlineAnimation>
              <a href="https://www.instagram.com/clicksuitenz/">Instagram</a>
            </UnderlineAnimation>
            <UnderlineAnimation>
              <a href="https://www.linkedin.com/company/click-suite/">
                LinkedIn
              </a>
            </UnderlineAnimation>
          </p>
        </div>
      </div>
    </div>
  )
}
