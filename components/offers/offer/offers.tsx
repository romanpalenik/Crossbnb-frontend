import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface OfferProps {
  id: number;
  paymentToken: string;
  price: number;
}

export const OfferCard = ({ id, paymentToken, price }: OfferProps) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ cursor: "pointer" }}>
      <Link
        href={{
          pathname: `offer/${id}`,
        }}
        passHref
      >
        <Card shadow="sm" p="lg" radius={10}>
          <Card.Section>
            <Image
              src="/../public/dom.jpg"
              height={800}
              width={800}
              alt="Norway"
            />
          </Card.Section>

          <Group
            position="apart"
            style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
          >
            <Text weight={500} style={{ color: theme.colors.brand[0] }}>
              Norway Fjord Adventures
            </Text>
          </Group>

          <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
            With Fjord Tours you can explore more of the magical fjord
            landscapes with tours and activities on and around the fjords of
            Norway
          </Text>

          <Group position="apart" style={{ marginTop: theme.spacing.sm }}>
            <Text size="sm" style={{ color: secondaryColor }}>
              <Text style={{ color: theme.colors.brand[0] }}>
                {price} {paymentToken}/per night
              </Text>
            </Text>
          </Group>
        </Card>
      </Link>
    </div>
  );
};
