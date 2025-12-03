import { ReactNode } from "react";

export interface MenuItemProps {
  icon: ReactNode;
  iconBg: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export interface StatsCardProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export interface NavItemProps {
  icon: any;
  label: string;
  to: string;
}

export interface FieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  actionType: "navigate" | "button" | "dropdown" | "";
  onClick?: () => void;
  actionLabel?: string;
  iconBgColor?: string;
}