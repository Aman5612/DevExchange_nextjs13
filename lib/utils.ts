import { type ClassValue, clsx } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import queryString from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num.toString();
  }
};

export const getTimestamp = (createdAt: Date) => {
  const timestamp = moment(createdAt).fromNow();
  return timestamp;
};

export const getJoinedDate = (date: Date): string => {
  if (!date) {
    return "Date not available";
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
};

interface UpdateProps {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlParams = ({ params, key, value }: UpdateProps) => {
  const currentUrl = queryString.parse(params);

  currentUrl[key] = value;

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveProps {
  params: string;
  keyToRemove: string[];
}

export const removeFromUrlParams = ({ params, keyToRemove }: RemoveProps) => {
  const currentUrl = queryString.parse(params);

  keyToRemove.forEach((k) => {
    delete currentUrl[k];
  });

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
