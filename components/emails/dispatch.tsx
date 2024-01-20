import { Incident } from "@/typings";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface Props {
  description: string;
  investigation: string;
  compiler: string;
  entity: string;
  category: string;
  referenceNumber: string;
}

export const DispatchEntryEmail = ({
  description,
  investigation,
  compiler,
  entity,
  category,
  referenceNumber,
}: Props) => {
  return (
    <Html>
      <Head />
      <Preview>
        {referenceNumber} - ${category}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            {/* <Img
            src={`${baseUrl}/static/stripe-logo.png`}
            width="49"
            height="21"
            alt="Stripe"
          /> */}
            {/* <Hr style={hr} /> */}
            <Text style={paragraph}>{description}</Text>
            {/* <Button style={button} href="https://dashboard.stripe.com/login">
            View your Stripe Dashboard
          </Button> */}
            <Hr style={hr} />
            {/* <Text style={paragraph}>
            If you haven't finished your integration, you might find our{" "}
            <Link style={anchor} href="https://stripe.com/docs">
              docs
            </Link>{" "}
            handy.
          </Text>
          <Text style={paragraph}>
            Once you're ready to start accepting payments, you'll just need to
            use your live{" "}
            <Link
              style={anchor}
              href="https://dashboard.stripe.com/login?redirect=%2Fapikeys"
            >
              API keys
            </Link>{" "}
            instead of your test API keys. Your account can simultaneously be
            used for both test and live requests, so you can continue testing
            while accepting live payments. Check out our{" "}
            <Link style={anchor} href="https://stripe.com/docs/dashboard">
              tutorial about account basics
            </Link>
            .
          </Text> */}

            <Text style={paragraph}>{investigation}</Text>
            <Text style={paragraph}>-{compiler}</Text>
            <Hr style={hr} />
            <Text style={footer}>{entity} Team </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default DispatchEntryEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "10px 0 28px",
  marginBottom: "64px",
};

const box = {
  padding: "0 28px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "10px 0",
};

const paragraph = {
  color: "#525f7f",

  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};

const anchor = {
  color: "#556cd6",
};

const button = {
  backgroundColor: "#656ee8",
  borderRadius: "5px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "10px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
