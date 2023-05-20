import { Link } from 'react-router-dom'
import AboutShope from './components/AboutShope'
import CustomerCare from './components/CustomerCare'
import PayAndDriveItem from './components/PayAndDriveItem'

import pay_1 from 'src/assets/images/pay_1.png'
import pay_2 from 'src/assets/images/pay_2.png'
import pay_3 from 'src/assets/images/pay_3.png'
import pay_4 from 'src/assets/images/pay_4.png'
import pay_5 from 'src/assets/images/pay_5.png'
import pay_6 from 'src/assets/images/pay_6.png'
import pay_7 from 'src/assets/images/pay_7.png'
import pay_8 from 'src/assets/images/pay_8.png'
import drive_1 from 'src/assets/images/drive_1.png'
import drive_2 from 'src/assets/images/drive_2.png'
import drive_3 from 'src/assets/images/drive_3.jpg'
import drive_4 from 'src/assets/images/drive_4.png'
import drive_5 from 'src/assets/images/drive_5.png'
import drive_6 from 'src/assets/images/drive_6.png'
import drive_7 from 'src/assets/images/drive_7.png'
import drive_8 from 'src/assets/images/drive_8.png'
import drive_9 from 'src/assets/images/drive_9.png'
import drive_10 from 'src/assets/images/drive_10.png'
import facebook from 'src/assets/images/facebook.png'
import instagram from 'src/assets/images/instagram.png'
import linkedIn from 'src/assets/images/linkedIn.png'
import qr from 'src/assets/images/qr.png'
import appStore from 'src/assets/images/appStore.png'
import gg_play from 'src/assets/images/gg_play.png'
import AppGallery from 'src/assets/images/AppGallery.png'
import logoCCDV from 'src/assets/images/logoCCDV.png'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation('home')
  return (
    <footer className='border-t-[4px] border-t-[#ee4d2d] bg-neutral-100 py-16'>
      <div className='container'>
        <div className='mb-10 grid grid-cols-1 border-b-[1px] pb-14 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-5 lg:gap-x-5'>
          <div className='lg:col-span-1'>
            <h4 className='text-[0.75rem] font-bold text-[rgba(0,0,0,.87)]'>{t('footer.customer-service')}</h4>
            <ul className='mt-4'>
              <CustomerCare content={t('footer.help-center')} />
              <CustomerCare content={t('footer.shopee-blog')} />
              <CustomerCare content={t('footer.shopee-mall')} />
              <CustomerCare content={t('footer.how-to-buy')} />
              <CustomerCare content={t('footer.how-to-sell')} />
              <CustomerCare content={t('footer.payment')} />
              <CustomerCare content={t('footer.shopee-coins')} />
              <CustomerCare content={t('footer.shipping')} />
              <CustomerCare content={t('footer.return-refund')} />
              <CustomerCare content={t('footer.contact-us')} />
              <CustomerCare content={t('footer.warranty-policy')} />
            </ul>
          </div>
          <div className='mt-4 sm:mt-0 lg:col-span-1 lg:mt-0'>
            <h4 className='text-[0.75rem] font-bold text-[rgba(0,0,0,.87)]'>{t('footer.about-shopee')}</h4>
            <ul className='mt-4'>
              <AboutShope content={t('footer.about-us')} />
              <AboutShope content={t('footer.shopee-careers')} />
              <AboutShope content={t('footer.shopee-policies')} />
              <AboutShope content={t('footer.private-policy')} />
              <AboutShope content={t('footer.shopee-mall')} />
              <AboutShope content={t('footer.seller-centre')} />
              <AboutShope content='Flash Sales' />
              <AboutShope content={t('footer.shopee-ambassador-programme')} />
              <AboutShope content={t('footer.media-contact')} />
            </ul>
          </div>
          <div className='mt-6 md:mt-0 lg:col-span-1 lg:mt-0'>
            <div>
              <h4 className='text-[0.75rem] font-bold uppercase text-[rgba(0,0,0,.87)]'>{t('footer.payment')}</h4>
              <ul className='mt-4 grid grid-cols-3 gap-x-2 pr-10'>
                <PayAndDriveItem url={pay_1} />
                <PayAndDriveItem url={pay_2} />
                <PayAndDriveItem url={pay_3} />
                <PayAndDriveItem url={pay_4} />
                <PayAndDriveItem url={pay_5} />
                <PayAndDriveItem url={pay_6} />
                <PayAndDriveItem url={pay_7} />
                <PayAndDriveItem url={pay_8} />
              </ul>
            </div>
            <div className='mt-6 sm:mt-6 lg:col-span-1'>
              <h4 className='text-[0.75rem] font-bold text-[rgba(0,0,0,.87)]'>{t('footer.logistics')}</h4>
              <ul className='mt-4 grid grid-cols-3 gap-x-2 pr-10'>
                <PayAndDriveItem url={drive_1} />
                <PayAndDriveItem url={drive_2} />
                <PayAndDriveItem url={drive_3} />
                <PayAndDriveItem url={drive_4} />
                <PayAndDriveItem url={drive_5} />
                <PayAndDriveItem url={drive_6} />
                <PayAndDriveItem url={drive_7} />
                <PayAndDriveItem url={drive_8} />
                <PayAndDriveItem url={drive_9} />
                <PayAndDriveItem url={drive_10} />
              </ul>
            </div>
          </div>
          <div className='mt-6 sm:mt-6 lg:col-span-1 lg:mt-0'>
            <h4 className='text-[0.75rem] font-bold text-[rgba(0,0,0,.87)]'>THEO DÕI CHÚNG TÔI TRÊN</h4>
            <ul className='mt-4'>
              <li className='mt-[6px]'>
                <Link to=''>
                  <img src={facebook} alt='' className='mr-2 inline-block h-[1rem] w-[1rem]' />
                  <span className='text-[0.75rem] text-[rgba(0,0,0,.65)] hover:text-red-500 hover:transition-colors'>
                    {t('footer.facebook')}
                  </span>
                </Link>
              </li>
              <li className='mt-[6px]'>
                <Link to=''>
                  <img src={instagram} alt='' className='mr-2 inline-block h-[1rem] w-[1rem]' />
                  <span className='text-[0.75rem] text-[rgba(0,0,0,.65)] hover:text-red-500 hover:transition-colors'>
                    {t('footer.instagram')}
                  </span>
                </Link>
              </li>
              <li className='mt-[6px]'>
                <Link to=''>
                  <img src={linkedIn} alt='' className='mr-2 inline-block h-[1rem] w-[1rem]' />
                  <span className='text-[0.75rem] text-[rgba(0,0,0,.65)] hover:text-red-500 hover:transition-colors'>
                    {t('footer.linkedIn')}
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className='mt-6 sm:mt-6 lg:col-span-1 lg:mt-0'>
            <h4 className='text-[0.75rem] font-bold text-[rgba(0,0,0,.87)]'>TẢI ỨNG DỤNG SHOPEE NGAY THÔI</h4>
            <div className='mt-4 flex justify-start'>
              <Link to='' className='mt-[6px]'>
                <img
                  src={qr}
                  alt=''
                  className='h-18 w-18 mr-2 inline-block rounded-[4px] bg-white p-[0.25rem] shadow-md'
                />
              </Link>

              <div className='mt-[6px] flex flex-col items-center justify-between'>
                <Link to='' className=''>
                  <img
                    src={appStore}
                    alt=''
                    className='mr-2 block h-full w-full rounded-[4px] bg-white p-[0.25rem]  shadow-md'
                  />
                </Link>
                <Link to='' className='mt-1'>
                  <img
                    src={gg_play}
                    alt=''
                    className='mr-2 block h-full w-full rounded-[4px] bg-white p-[0.25rem]  shadow-md'
                  />
                </Link>
                <Link to='' className='mt-1'>
                  <img
                    src={AppGallery}
                    alt=''
                    className='mr-2 block h-full w-full rounded-[4px] bg-white p-[0.25rem] shadow-md'
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='text-[13px] text-[rgba(0,0,0,.54)]'>
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
            <div className='lg:col-span-1'>{t('footer.all-rights-reserved')}</div>
            <div className='lg:col-span-2'>
              {t('footer.country-region')}: Singapore | Indonesia | Đài Loan | Thái Lan | Malaysia | Việt Nam |
              Philippines | Brazil | México | Colombia | Chile
            </div>
          </div>
          <div className='mt-8 flex items-center justify-center text-[12px] '>
            <div className='border-r-[1px] border-[rgba(0,0,0,.09)] px-[1.5rem]'>
              <Link to=''>
                <span>{t('footer.privacy-policy')}</span>
              </Link>
            </div>
            <div className='border-r-[1px] border-[rgba(0,0,0,.09)] px-[1.5rem] '>
              <Link to=''>
                <span>{t('footer.term-of-service')}</span>
              </Link>
            </div>
            <div className='border-r-[1px] border-[rgba(0,0,0,.09)] px-[1.5rem] '>
              <Link to=''>
                <span>{t('footer.shipping-policy')}</span>
              </Link>
            </div>
            <div className='border-[rgba(0,0,0,.09)] px-[1.5rem]  '>
              <Link to=''>
                <span>{t('footer.violation')}</span>
              </Link>
            </div>
          </div>
          <div className='mt-8 flex items-center justify-center text-[12px]'>
            <Link to=''>
              <img src={logoCCDV} alt='' className='mr-2 block h-[45px] w-[120px] rounded-[4px] px-[0.5rem] ' />
            </Link>
            <Link to=''>
              <img src={logoCCDV} alt='' className='mr-2 block h-[45px] w-[120px] rounded-[4px]  px-[0.5rem] ' />
            </Link>

            <Link to=''>
              <img src={logoCCDV} alt='' className='mr-2 block h-[45px] w-[120px] rounded-[4px] px-[0.5rem] ' />
            </Link>
          </div>
          <div className='mt-3 text-center text-[11px] text-[rgba(0,0,0,.65)]'>
            <div>{t('footer.label-legal-company')}</div>
            <div className='mt-3'>{t('footer.label-legal-address')}</div>
            <div className='mt-1'>{t('footer.label-legal-license')}</div>
            <div className='mt-1'>{t('footer.label-legal-copyright')}</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
