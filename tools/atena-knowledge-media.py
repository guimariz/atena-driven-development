"""Local launcher: load only this explicitly located optional package."""
from pathlib import Path
import importlib.util
import sys

root = Path(__file__).resolve().parents[1] / "packages/atena-knowledge-media/src/atena_knowledge_media"
spec = importlib.util.spec_from_file_location("atena_knowledge_media", root / "__init__.py", submodule_search_locations=[str(root)])
module = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = module
spec.loader.exec_module(module)
from atena_knowledge_media.cli import main

if __name__ == "__main__":
    raise SystemExit(main())
