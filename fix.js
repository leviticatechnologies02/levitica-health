const fs = require('fs');
const path = require('path');

const root = 'c:/Users/Lalith/OneDrive/Desktop/levitica-health/src/pages/admin';

function replaceInDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceInDir(fullPath);
        } else if (fullPath.endsWith('.jsx') && file !== 'Doctors.jsx') {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content;
            if (dir === root) {
                // files in src/pages/admin
                updated = content.replace(/import ModulePlaceholder from '\.\.\/\.\.\/\.\.\/components\/common\/ModulePlaceholder';/g, "import ModulePlaceholder from '../../components/common/ModulePlaceholder';");
            } else {
                // files in src/pages/admin/hospital or staff
                updated = content.replace(/import ModulePlaceholder from '\.\.\/\.\.\/\.\.\/\.\.\/components\/common\/ModulePlaceholder';/g, "import ModulePlaceholder from '../../../components/common/ModulePlaceholder';");
            }
            if (content !== updated) {
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log('Updated ' + fullPath);
            }
        }
    }
}

replaceInDir(root);
