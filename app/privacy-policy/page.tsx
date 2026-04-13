import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LogoDark from "@/public/images/bitsika-logo.png";

const META_TITLE = "Bitsika — Privacy Policy";
const META_DESCRIPTION =
  "Africa's cash app. Send, spend, issue Visa cards, buy airtime etc.";

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    type: "article",
    url: "https://bitsika.com/privacy-policy",
  },
  twitter: {
    card: "summary",
    title: META_TITLE,
    description: META_DESCRIPTION,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full border-b border-border-default">
        <div className="max-w-300 mx-auto px-6 py-4">
          <Link href="/">
            <Image
              src={LogoDark}
              alt="Bitsika logo"
              width={100}
              className="w-20 md:w-25 cursor-pointer"
              priority
            />
          </Link>
        </div>
      </div>

      <div className="max-w-300  mx-auto px-6 pt-10 pb-16">
        <h1 className="text-[24px] md:text-[48px] font-bold text-ink text-center mb-10">
          BITSIKA Privacy Policy
        </h1>

        <div className="text-base text-ink-secondary space-y-3 leading-relaxed">
          <p>
            This privacy policy describes our policies and procedures on the
            collection, use and disclosure of your information when you use the
            service and tells you about your privacy rights and how the law
            protects you. We use your personal data to provide and improve the
            Service. By using the service, you agree to the collection and use
            of information in accordance with this Privacy Policy.
            <br />
            Please read this carefully as this policy is legally binding when
            you use our Services.
          </p>
          <p>
            For the purpose of the relevant data protection regulations, Block
            Afranew Inc is the &ldquo;data controller&rdquo; of your
            information. We are located at 2 Afro Avenue East Legon, Ajiringano,
            Accra, Ghana. Our registration number with the Registrar General
            department is CS259972019. If you have any questions about how we
            protect or use your data, please email:{" "}
            <a
              href="mailto:info@bitsika.africa"
              className="text-brand-accent underline"
            >
              info@bitsika.africa
            </a>
            .
          </p>

          <h2 className="text-lg font-bold text-ink mt-8">
            Interpretation and Definitions
          </h2>
          <p>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>

          <h2 className="text-lg font-bold text-ink mt-8">Definitions</h2>
          <p>For the purposes of this Privacy Policy:</p>
          <p>
            <strong>Account</strong> means a unique account created for You to
            access our Service or parts of our Service.
          </p>
          <p>
            <strong>Affiliate</strong> means an entity that controls, is
            controlled by or is under common control with a party, where
            &ldquo;control&rdquo; means ownership of 50% or more of the shares,
            equity interest or other securities entitled to vote for election of
            directors or other managing authority.
          </p>
          <p>
            <strong>Application</strong> refers to Bitsika, the software program
            provided by the Company.
          </p>
          <p>
            <strong>Company</strong> (referred to as either &ldquo;the
            Company&rdquo;, &ldquo;We&rdquo;, &ldquo;Us&rdquo; or
            &ldquo;Our&rdquo; in this Agreement) refers to Block Afranew, 2 Afro
            Avenue East Legon, Adjiringano, Accra, Ghana.
          </p>
          <p>
            <strong>Cookies</strong> are small files that are placed on Your
            computer, mobile device or any other device by a website, containing
            the details of Your browsing history on that website among its many
            uses.
          </p>
          <p>
            <strong>Device</strong> means any device that can access the Service
            such as a computer, a cellphone or a digital tablet.
          </p>
          <p>
            <strong>Personal Data</strong> is any information that relates to an
            identified or identifiable individual.
          </p>
          <p>
            <strong>Service</strong> refers to the Application or the Website or
            both.
          </p>
          <p>
            <strong>Service Provider</strong> means any natural or legal person
            who processes the data on behalf of the Company. It refers to
            third-party companies or individuals employed by the Company to
            facilitate the Service, to provide the Service on behalf of the
            Company, to perform services related to the Service or to assist the
            Company in analyzing how the Service is used.
          </p>
          <p>
            <strong>Third-party Social Media Service</strong> refers to any
            website or any social network website through which a User can log
            in or create an account to use the Service.
          </p>
          <p>
            <strong>Usage Data</strong> refers to data collected automatically,
            either generated by the use of the Service or from the Service
            infrastructure itself (for example, the duration of a page visit).
          </p>
          <p>
            <strong>Website</strong> refers to Bitsika, accessible from{" "}
            <a
              href="https://www.bitsika.com"
              className="text-brand-accent underline"
            >
              www.bitsika.com
            </a>
          </p>
          <p>
            <strong>You</strong> means the individual accessing or using the
            Service, or the company, or other legal entity on behalf of which
            such individual is accessing or using the Service, as applicable.
          </p>

          <h2 className="text-lg font-bold text-ink mt-8">
            Collecting and Using Your Personal Data
          </h2>
          <h3 className="text-base font-bold text-ink mt-4">
            Information we may collect from you
          </h3>
          <h3 className="text-base font-bold text-ink mt-4">Personal Data</h3>
          <p>
            While using Our Service, We may ask You to provide Us with certain
            personally identifiable information that can be used to contact or
            identify You. Personally identifiable information may include, but
            is not limited to:
          </p>
          <p>
            (a) You may give us information about you when you sign up to use
            our service, e.g. when you provide us with your personal details.
            This also includes information you provide through your continued
            use of our Services, participate in discussion boards or other
            social media functions on our Website or App, enter a competition,
            promotion or survey, and when you report a problem with our
            Services. The information you give us may include your name,
            contact list, address, e-mail address, phone number, financial
            information (including credit card, debit card, or bank account
            information), payment reason, geographical location, social
            security number, personal description and photograph.
          </p>
          <p>
            (b) In order to provide you with the Service, we will also need to
            collect information from you about the intended recipient of the
            payment you request us to make. We will therefore ask you to
            provide contact details of your intended recipient. You can do this
            by manually entering a username, bank account details, phone number
            into the Bitsika App.
          </p>
          <p>
            (c) We may also need additional commercial and/or identification
            information from you e.g. if you send or receive certain high-value
            or high volume transactions or as needed to comply with our
            anti-money laundering obligations under applicable law.
          </p>
          <p>
            (d) In providing the personal data of any individual (other than
            yourself) to us during your use of our Services, you promise that
            you have obtained consent from such individual to disclose his/her
            personal data to us, as well his/her consent to our collection, use
            and disclosure of such personal data, for the purposes set out in
            this Privacy Policy.
          </p>

          <h3 className="text-base font-bold text-ink mt-6">
            Information we collect about you with regard to your use of our
            Services we may automatically collect the following information:
          </h3>
          <p>
            (a) details of the transactions you carry out when using our
            Services, including geographic location from which the transaction
            originates;
          </p>
          <p>
            (b) contact list uploading. By signing up, you agree to allow us
            access and upload your contacts list to make it easier for you to
            find the people you want to send money to, to help you invite your
            friends to Bitsika App, for account and identity verification and
            fraud prevention purposes, to reduce the risk you will send
            payments to the wrong person, or to provide other personalised
            services.
          </p>
          <p>
            (c) other information You Provide. We collect information that you
            voluntarily provide to us, including your photograph, if you choose
            to upload a picture to the Services; survey responses;
            participation in contests, or other prospective marketing forms or
            devices; suggestions for improvements; referrals; or any other
            actions you perform on the Services.
          </p>
          <p>
            (d) technical information, including the Internet protocol (IP)
            address used to connect your computer to the Internet, your login
            information, browser type and version, time zone setting, browser
            plug-in types and versions, operating system and platform;
          </p>
          <p>
            (e) information about your visit, including the full Uniform
            Resource Locators (URL) clickstream to, through and from our
            Website or App (including date and time); products you viewed or
            searched for; page response times, download errors, length of
            visits to certain pages, page interaction information (such as
            scrolling, clicks, and mouse-overs), and methods used to browse
            away from the page and any phone number used to call our Customer
            Support number.
          </p>

          <h3 className="text-base font-bold text-ink mt-6">
            Information we receive from other sources.
          </h3>
          <p>
            We may receive information about you if you use any of the other
            websites we operate or the other services we provide. We are also
            working closely with third parties and may receive information
            about you from them.
          </p>
          <p>For example:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              the banks you use to transfer money to us will provide us with
              your basic personal information, such as your name and address,
              as well as your financial information such as your bank account
              details;
            </li>
            <li>
              business partners may provide us with your name and address, as
              well as financial information, such as card payment information;
            </li>
            <li>
              advertising networks, analytics providers and search information
              providers may provide us with pseudonymised information about
              you, such as confirming how you found our website;
            </li>
            <li>
              credit reference agencies do not provide us with any personal
              information about yourself, but may be used to corroborate the
              information you have provided to us.
            </li>
          </ul>

          <h3 className="text-base font-bold text-ink mt-6">
            Information from Third-Party Social Media Services.
          </h3>
          <p>
            The Company allows You to create an account and log in to use the
            Service through the following Third-party Social Media Services:
            Google and Apple. If you log in to our Services using your social
            media account (for example, Google) we will receive relevant
            information that is necessary to enable our Services and
            authenticate you. The social media network will provide us with
            access to certain information that you have provided to them,
            including your name, profile image and e-mail address. We use such
            information, together with any other information you directly
            provide to us when registering or using our Services, to create
            your account and to communicate with you about the information,
            products and services that you request from us. You may also be
            able to specifically request that we have access to the contacts in
            your social media account so that you can send a referral link to
            your family and friends. We will use, disclose and store all of
            this information in accordance with this privacy policy.
          </p>

          <h3 className="text-base font-bold text-ink mt-6">
            How do we protect your personal data
          </h3>
          <p>
            We are serious about guarding the security of your personal
            information and use a secure server to store your personal
            information. All information you provide to us is stored on our
            secure servers. Once we have received your information, we will use
            strict procedures and security features to prevent unauthorised
            access and use.
          </p>
          <p>
            We restrict access of your personal information to our employees
            who have a business reason for knowing such information. We
            continuously educate and train our employees about the importance
            of confidentiality and privacy of customer information. We maintain
            physical, electronic and procedural safeguards that comply with the
            relevant laws and regulations to protect your personal information
            from unauthorised access.
          </p>

          <h3 className="text-base font-bold text-ink mt-6">Cookies</h3>
          <p>
            Our Services may use cookies to distinguish you from other users.
            This helps us to provide you with a good experience and also allows
            us to improve our Services. For detailed information on the cookies
            we use and the purposes for which we use them see our Cookie
            Policy.
          </p>

          <h2 className="text-lg font-bold text-ink mt-8">
            Use of Your Personal Data
          </h2>
          <p>
            <strong>
              The Company may use Personal Data for the following purposes:
            </strong>
          </p>
          <p>
            <strong>To provide and maintain our Service</strong>, including to
            monitor the usage of our Service.
          </p>
          <p>
            <strong>To manage Your Account:</strong> to manage Your registration
            as a user of the Service. The Personal Data You provide can give
            You access to different functionalities of the Service that are
            available to You as a registered user.
          </p>
          <p>
            <strong>For the performance of a contract:</strong> the development,
            compliance and undertaking of the purchase contract for the
            products, items or services You have purchased or of any other
            contract with Us through the Service.
          </p>
          <p>
            <strong>To contact You:</strong> To contact You by email, telephone
            calls, SMS, or other equivalent forms of electronic communication,
            such as a mobile application&apos;s push notifications regarding
            updates or informative communications related to the
            functionalities, products or contracted services, including the
            security updates, when necessary or reasonable for their
            implementation.
          </p>
          <p>
            <strong>To provide You</strong> with news, special offers and
            general information about other goods, services and events which we
            offer that are similar to those that you have already purchased or
            enquired about unless You have opted not to receive such
            information.
          </p>
          <p>
            <strong>To manage Your requests:</strong> To attend and manage Your
            requests to Us.
          </p>
          <p>
            <strong>For business transfers:</strong> We may use Your information
            to evaluate or conduct a merger, divestiture, restructuring,
            reorganisation, dissolution, or other sale or transfer of some or
            all of Our assets, whether as a going concern or as part of
            bankruptcy, liquidation, or similar proceeding, in which Personal
            Data held by Us about our Service users is among the assets
            transferred.
          </p>
          <p>
            <strong>For other purposes:</strong> We may use Your information for
            other purposes, such as data analysis, identifying usage trends,
            determining the effectiveness of our promotional campaigns and to
            evaluate and improve our Service, products, services, marketing and
            your experience. We may also use or upload your contact information
            such as username, profile picture, on our website which can be
            accessed at{" "}
            <a
              href="https://www.bitsika.com"
              className="text-brand-accent underline"
            >
              www.bitsika.com
            </a>
          </p>

          <h3 className="text-base font-bold text-ink mt-6">
            Uses made of the information
          </h3>
          <p>We use your information in the following ways:</p>
          <p>
            (a) to carry out our obligations relating to your contract with us
            and to provide you with the information, products and services;
          </p>
          <p>
            (b) to comply with any applicable legal and/or regulatory
            requirements;
          </p>
          <p>(c) to notify you about changes to our Services;</p>
          <p>(d) as part of our efforts to keep our Services safe and secure;</p>
          <p>
            (e) to administer our Services and for internal operations,
            including troubleshooting, data analysis, testing, research,
            statistical and survey purposes;
          </p>
          <p>
            (f) to improve our Services and to ensure that they are presented
            in the most effective manner;
          </p>
          <p>
            (g) to measure or understand the effectiveness of advertising we
            serve and to deliver relevant advertising to you;
          </p>
          <p>
            (h) to allow you to participate in interactive features of our
            Services, when you choose to do so;
          </p>
          <p>
            (i) to provide you with information about other similar goods and
            services we offer;
          </p>
          <p>
            (j) to provide you, or permit selected third parties to provide
            you, with information about goods or services we feel may interest
            you; or
          </p>
          <p>
            (k) to combine information we receive from other sources with the
            information you give to us and information we collect about you. We
            may use this information and the combined information for the
            purposes set out above (depending on the types of information we
            receive).
          </p>

          <h2 className="text-lg font-bold text-ink mt-8">
            Disclosure of your information
          </h2>
          <p>5.1 We may share your information with selected third parties including:</p>
          <p>
            (a) affiliates, business partners, suppliers and sub-contractors
            for the performance and execution of any contract we enter into
            with them or you;
          </p>
          <p>
            (b) advertisers and advertising networks solely to select and serve
            relevant adverts to you and others; and
          </p>
          <p>
            (c) analytics and search engine providers that assist us in the
            improvement and optimisation of our site.
          </p>
          <p>5.2 We may disclose your personal information to third parties:</p>
          <p>
            (d) in the event that we sell or buy any business or assets, in
            which case we may disclose your personal data to the prospective
            seller or buyer of such business or assets;
          </p>
          <p>
            (e) if we are under a duty to disclose or share your personal data
            in order to comply with any legal obligation, or in order to
            enforce or apply our User Agreement and other applicable
            agreements; or to protect the rights, property, or safety of Bit
            Sika, our customers, or others. This includes exchanging
            information with other companies and organizations for the purposes
            of fraud protection and credit risk reduction;
          </p>
          <p>
            (f) to assist us in conducting or co-operating in investigations of
            fraud or other illegal activity where we believe it is reasonable
            and appropriate to do so;
          </p>
          <p>(g) to prevent and detect fraud or crime;</p>
          <p>
            (h) in response to a subpoena, warrant, court order, or as
            otherwise required by law;
          </p>
          <p>(i) to assess financial and insurance risks;</p>
          <p>(j) to recover debt or in relation to your insolvency; and</p>
          <p>(k) to develop customer relationships, services and systems.</p>
          <p>
            We do not have a published list of all of the third parties with
            whom we share your data with, as this would be heavily dependent on
            your specific use of our Services. However, if you would like
            further information about who we have shared your data with, or to
            be provided with a list specific to you, you can request this by
            writing to{" "}
            <a
              href="mailto:info@bitsika.africa"
              className="text-brand-accent underline"
            >
              info@bitsika.africa
            </a>
            .
          </p>

          <h2 className="text-lg font-bold text-ink mt-8">
            Where we store your personal data
          </h2>
          <p>
            6.1 The data that we collect from you may be transferred to, and
            stored at, secured serves. It may also be processed by staff who
            work for us or for one of our suppliers. Such staff maybe engaged
            in, among other things, the fulfilment of your payment order, the
            processing of your payment details and the provision of support
            services. By submitting your personal data, you agree to this
            transfer, storing or processing. We will take all steps reasonably
            necessary to ensure that your data is treated securely and in
            accordance with this privacy policy.
          </p>

          <h2 className="text-lg font-bold text-ink mt-8">
            Profiling and Automated Decision Making
          </h2>
          <p>
            We may use some instances of your data in order to customize our
            Services and the information we provide to you, and to address your
            needs - such as your country of address and transaction history.
            For example, if you frequently send funds from one particular
            currency to another, we may use this information to inform you of
            new product updates or features that may be useful for you. When we
            do this, we take all necessary measures to ensure that your privacy
            and security are protected - and we only use pseudonym data where
            ever possible. This activity has no legal effect on you.
          </p>
          <p>
            As part of being a highly technical and innovative company, we may
            use Automated Decision Making (ADM) in order to improve your
            experience, or to help fight financial crime. For example, so that
            we can provide you with a fast and efficient service, we may use
            ADM to verify your identity documents, or to confirm the accuracy
            of the information you have provided to us. None of our ADM
            processes have a legal effect on you.
          </p>

          <h2 className="text-lg font-bold text-ink mt-8">Data Retention</h2>
          <p>
            As a financial institution, Bitsika is required by law to store
            some of your personal and transactional data beyond the closure of
            your account with us. Your data is only accessed internally on a
            need to know basis, and it will only be accessed or processed if
            absolutely necessary. We will always delete data that is no longer
            required by a relevant law or jurisdiction in which we operate.
          </p>

          <h2 className="text-lg font-bold text-ink mt-8">Your rights</h2>
          <p>
            You have the right to ask us not to contact you for marketing
            purposes by contacting us at{" "}
            <a
              href="mailto:info@bitsika.africa"
              className="text-brand-accent underline"
            >
              info@bitsika.africa
            </a>
            .
          </p>
          <p>
            You have the right to correct any personal information we hold on
            you that is inaccurate, incorrect, or out of date.
          </p>
          <p>
            You have the right to ask us to delete your data when it is no
            longer necessary, or no longer subject to a legal obligation to
            which Bitsika is subject to.
          </p>
          <p>
            You have the right to transfer your personal data between data
            controllers, for example, to move your account details from one
            online platform to another.
          </p>

          <h2 className="text-lg font-bold text-ink mt-8">
            Access to information
          </h2>
          <p>
            Subject to applicable laws, you may have the right to access
            information we held about you. Your right of access can be
            exercised in accordance with the relevant data protection
            legislation.
          </p>

          <h2 className="text-lg font-bold text-ink mt-8">
            Changes to our privacy policy
          </h2>
          <p>
            Any changes we may make to our privacy policy will be posted on
            this page and, where appropriate, notified to you by e-mail. Please
            check back frequently to see any updates or changes to our privacy
            policy.
          </p>

          <h2 className="text-lg font-bold text-ink mt-8">Contact</h2>
          <p>
            Questions, comments and requests regarding this privacy policy are
            welcomed and should be addressed to{" "}
            <a
              href="mailto:info@bitsika.africa"
              className="text-brand-accent underline"
            >
              info@bitsika.africa
            </a>
            .
          </p>
          <p>
            If you have questions or concerns regarding this Agreement or your
            Bit Sika account, or any feedback that you would like us to
            consider, please email us{" "}
            <a
              href="mailto:hi@bitsika.africa"
              className="text-brand-accent underline"
            >
              hi@bitsika.africa
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
