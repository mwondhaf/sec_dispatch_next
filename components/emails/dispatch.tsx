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
            <Text style={paragraph}>{description}</Text>
            <Hr style={hr} />
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
