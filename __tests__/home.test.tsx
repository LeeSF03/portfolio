import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Topbar, MenuItemWithRef } from '@/components/Topbar'
import { createRef } from 'react'
import { SkillCard } from '@/components/SkillCard'
import { ContactCard } from '@/components/ContactCard'

test('Test Topbar component', async () => {
  const mockRef = createRef<HTMLDivElement | null>()
  const menuItems: MenuItemWithRef[] = [
    { title: 'About Me', ref: mockRef },
    { title: 'Skills', ref: mockRef },
    { title: 'Contacts', ref: mockRef },
  ]

  const { getByText } = render(<Topbar menuItemsWithRef={menuItems} />)
  expect(getByText('About Me')).toBeDefined()
  expect(getByText('Skills')).toBeDefined()
  expect(getByText('Contacts')).toBeDefined()
})

test('Test SkillCard component', () => {
  const { getByText, getByAltText } = render(
    <SkillCard title={'Card Title'} img={''} alt={'alt text'} />
  )

  expect(getByText('Card Title')).toBeDefined()
  expect(getByAltText('alt text')).toBeDefined()
})

test('Test ContactCard component', () => {
  const { getByText, getByAltText, getByRole, getByDisplayValue } = render(
    <ContactCard
      link={'https://test/'}
      title={'Card Title'}
      img={''}
      alt={'alt text'}
    />
  )

  expect(getByRole('link')).toHaveProperty('href', 'https://test/')
  // expect(getByDisplayValue('Card Title')).toBeDefined()
  // expect(getByAltText('alt text')).toBeDefined()
})
