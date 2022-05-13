import { Card, Group, Text, useMantineTheme } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface OfferProps {
  id: number;
  paymentToken: string;
  price: number;
  name: string;
  description: string;
}

export const OfferCard = ({
  id,
  paymentToken,
  price,
  name,
  description,
}: OfferProps) => {
  const theme = useMantineTheme();

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ cursor: 'pointer' }}>
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
            <Text weight={500}>{name}</Text>
          </Group>

          <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
            {description}
          </Text>

          <Group position="apart" style={{ marginTop: theme.spacing.sm }}>
            <Text size="sm" style={{ color: secondaryColor }}>
              <Text>
                {price} {paymentToken}/per night
              </Text>
            </Text>
          </Group>
        </Card>
      </Link>
    </div>
  );
};
