
import chalk from 'chalk'

export function formatTitle(severity, message) {
  return chalk[bgColor(severity)].black('', message, '');
}

export function formatText(severity, message) {
  return chalk[textColor(severity)](message);
}

export function bgColor(severity) {
  const color = textColor(severity);
  return 'bg'+ capitalizeFirstLetter(color)
}

export function textColor(serverity) {
  switch (serverity.toLowerCase()) {
    case 'success': return 'green';
    case 'info': return 'blue';
    case 'note': return 'white';
    case 'warning': return 'yellow';
    case 'error': return 'red';
    default: return 'red';
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
