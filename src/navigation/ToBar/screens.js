import { Icons } from '../../components/Icons';
import { Group } from '../../screens/Group';
import { Sistema } from '../../screens/Sistema';
import { Exercicio } from '../../screens/Exercicio';

export const ToBarTabs = [
  { 
    route: 'Grupo', 
    label: 'Grupo', 
    type: Icons.Ionicons, 
    activeIcon: 'calendar', 
    inActiveIcon: 'calendar-outline', 
    component: Group 
  },
  { 
    route: 'Sistema', 
    label: 'Sistema', 
    type: Icons.Ionicons, 
    activeIcon: 'barbell', 
    inActiveIcon: 'barbell-outline', 
    component: Sistema 
  },
  { 
    route: 'Exercicio', 
    label: 'Exercicio', 
    type: Icons.Ionicons, 
    activeIcon: 'add-circle', 
    inActiveIcon: 'add-circle-outline', 
    component: Exercicio 
  },
];